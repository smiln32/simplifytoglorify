"""
Image Processor - Daily routine to resize and color grade images
Windows automation script for Simplify to Glorify
Resizes to 1080x1080 and applies warm afternoon glow color grade
"""

import os
import sys
from pathlib import Path
from PIL import Image
import numpy as np
from datetime import datetime
import logging

# Configure logging
log_file = os.path.expanduser("~\\Documents\\image_processor_log.txt")
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# CONFIGURATION - Edit these paths
SOURCE_FOLDER = os.path.expanduser("~\\Pictures\\Images_to_Process")  # Change to your source folder
OUTPUT_FOLDER = os.path.expanduser("~\\Pictures\\Images_Processed")   # Change to your output folder
ARCHIVE_FOLDER = os.path.expanduser("~\\Pictures\\Images_Archive")    # Images moved here after processing

TARGET_SIZE = (1080, 1080)
SUPPORTED_FORMATS = {'.jpg', '.jpeg', '.png', '.webp', '.bmp'}


def ensure_folders_exist():
    """Create output and archive folders if they don't exist"""
    for folder in [OUTPUT_FOLDER, ARCHIVE_FOLDER]:
        Path(folder).mkdir(parents=True, exist_ok=True)
    logger.info(f"Folders ready: {OUTPUT_FOLDER} | {ARCHIVE_FOLDER}")


def apply_warm_afternoon_glow(image):
    """
    Apply warm afternoon glow color grade
    - Increases warmth (red/yellow tones)
    - Lifts shadows slightly (more luminosity)
    - Reduces blue channel
    - Adds subtle saturation boost
    """
    # Convert to numpy array for processing
    img_array = np.array(image, dtype=np.float32) / 255.0
    
    # Split into RGB channels
    if len(img_array.shape) == 3:
        r, g, b = img_array[:, :, 0], img_array[:, :, 1], img_array[:, :, 2]
    else:
        logger.warning("Image is not RGB, converting...")
        image = image.convert('RGB')
        img_array = np.array(image, dtype=np.float32) / 255.0
        r, g, b = img_array[:, :, 0], img_array[:, :, 1], img_array[:, :, 2]
    
    # 1. Warm color shift: boost red and yellow (red + green)
    r = np.clip(r * 1.15, 0, 1)  # +15% red boost
    g = np.clip(g * 1.08, 0, 1)  # +8% green boost
    b = np.clip(b * 0.92, 0, 1)  # -8% blue reduction (removes blue cast)
    
    # 2. Lift shadows (add glow): brighten darker areas
    shadow_lift = 0.05
    r = np.clip(r + shadow_lift * (1 - r), 0, 1)
    g = np.clip(g + shadow_lift * (1 - g), 0, 1)
    b = np.clip(b + shadow_lift * (1 - b), 0, 1)
    
    # 3. Subtle saturation boost (make colors more vivid)
    # Calculate luminance
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    saturation_boost = 1.10  # +10% saturation
    
    r = np.clip(luminance + saturation_boost * (r - luminance), 0, 1)
    g = np.clip(luminance + saturation_boost * (g - luminance), 0, 1)
    b = np.clip(luminance + saturation_boost * (b - luminance), 0, 1)
    
    # Recombine channels
    graded = np.stack([r, g, b], axis=2)
    
    # Convert back to 0-255 and PIL Image
    graded = (graded * 255).astype(np.uint8)
    result = Image.fromarray(graded, 'RGB')
    
    return result


def resize_image(image):
    """
    Resize image to 1080x1080 with smart padding/cropping
    Maintains aspect ratio, adds padding if necessary (uses warm background)
    """
    image.thumbnail(TARGET_SIZE, Image.Resampling.LANCZOS)
    
    # Create new 1080x1080 image with warm background color
    # Warm tone: slightly peachy/golden
    warm_bg = (240, 200, 160)  # Warm peachy tone
    new_image = Image.new('RGB', TARGET_SIZE, warm_bg)
    
    # Center the resized image
    offset = (
        (TARGET_SIZE[0] - image.width) // 2,
        (TARGET_SIZE[1] - image.height) // 2
    )
    new_image.paste(image, offset)
    
    return new_image


def process_image(input_path):
    """Process a single image: resize then color grade"""
    try:
        filename = os.path.basename(input_path)
        logger.info(f"Processing: {filename}")
        
        # Open image
        img = Image.open(input_path).convert('RGB')
        
        # Resize to 1080x1080
        img = resize_image(img)
        logger.info(f"  ✓ Resized to {TARGET_SIZE}")
        
        # Apply warm afternoon glow color grade
        img = apply_warm_afternoon_glow(img)
        logger.info(f"  ✓ Color graded (warm afternoon glow)")
        
        # Save to output folder
        output_path = os.path.join(OUTPUT_FOLDER, filename)
        img.save(output_path, quality=95)
        logger.info(f"  ✓ Saved to {OUTPUT_FOLDER}")
        
        return True
    
    except Exception as e:
        logger.error(f"Error processing {filename}: {str(e)}")
        return False


def archive_source_image(input_path):
    """Move processed source image to archive folder"""
    try:
        filename = os.path.basename(input_path)
        archive_path = os.path.join(ARCHIVE_FOLDER, filename)
        
        # Handle duplicates in archive
        if os.path.exists(archive_path):
            base, ext = os.path.splitext(filename)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            archive_path = os.path.join(ARCHIVE_FOLDER, f"{base}_{timestamp}{ext}")
        
        os.rename(input_path, archive_path)
        logger.info(f"  ✓ Archived to {ARCHIVE_FOLDER}")
    
    except Exception as e:
        logger.error(f"Error archiving {filename}: {str(e)}")


def run_daily_routine():
    """Main routine: process all images in source folder"""
    logger.info("=" * 60)
    logger.info(f"IMAGE PROCESSOR STARTED - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    logger.info("=" * 60)
    
    ensure_folders_exist()
    
    # Check if source folder exists
    if not os.path.exists(SOURCE_FOLDER):
        logger.error(f"SOURCE FOLDER NOT FOUND: {SOURCE_FOLDER}")
        logger.info("Please update SOURCE_FOLDER in the script.")
        return
    
    # Find all images in source folder
    image_files = [
        f for f in os.listdir(SOURCE_FOLDER)
        if os.path.isfile(os.path.join(SOURCE_FOLDER, f))
        and os.path.splitext(f)[1].lower() in SUPPORTED_FORMATS
    ]
    
    if not image_files:
        logger.info("No images found in source folder.")
        return
    
    logger.info(f"Found {len(image_files)} image(s) to process")
    
    successful = 0
    failed = 0
    
    for filename in image_files:
        input_path = os.path.join(SOURCE_FOLDER, filename)
        
        if process_image(input_path):
            archive_source_image(input_path)
            successful += 1
        else:
            failed += 1
    
    logger.info("=" * 60)
    logger.info(f"ROUTINE COMPLETE - {successful} processed, {failed} failed")
    logger.info("=" * 60)


if __name__ == "__main__":
    run_daily_routine()
