from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    img = Image.new("RGBA", (size, size), (25, 25, 25, 255))
    draw = ImageDraw.Draw(img)
    
    # Outer rounded rectangle / background accent
    pad = int(size * 0.12)
    radius = int(size * 0.18)
    
    # Draw dark surface container
    draw.rounded_rectangle([pad, pad, size - pad, size - pad], radius=radius, fill=(35, 35, 35, 255), outline=(50, 50, 50, 255), width=int(size * 0.02))
    
    # Draw stylized document sheet
    doc_left = int(size * 0.28)
    doc_top = int(size * 0.22)
    doc_right = int(size * 0.72)
    doc_bottom = int(size * 0.78)
    
    draw.rounded_rectangle([doc_left, doc_top, doc_right, doc_bottom], radius=int(size * 0.04), fill=(240, 240, 240, 255))
    
    # Draw folded corner on the document
    fold = int(size * 0.14)
    # Fold triangle
    draw.polygon([(doc_right - fold, doc_top), (doc_right, doc_top + fold), (doc_right - fold, doc_top + fold)], fill=(200, 200, 200, 255))
    
    # Draw reflow lines (representing reflowed reading text)
    line_left = doc_left + int(size * 0.08)
    line_right = doc_right - int(size * 0.08)
    line_h = max(2, int(size * 0.035))
    gap = int(size * 0.07)
    start_y = doc_top + int(size * 0.18)
    
    # Header line (blue accent)
    draw.rounded_rectangle([line_left, start_y, line_left + int((line_right - line_left) * 0.55), start_y + line_h], radius=line_h//2, fill=(37, 99, 235, 255))
    
    # Content lines
    for i in range(1, 5):
        y = start_y + i * gap
        width_ratio = 0.85 if i != 4 else 0.45
        w = int((line_right - line_left) * width_ratio)
        draw.rounded_rectangle([line_left, y, line_left + w, y + line_h], radius=line_h//2, fill=(100, 100, 100, 255))
        
    os.makedirs("public", exist_ok=True)
    img.save(os.path.join("public", filename), "PNG")
    print(f"Generated public/{filename} ({size}x{size})")

create_icon(192, "icon-192.png")
create_icon(512, "icon-512.png")
create_icon(180, "apple-touch-icon.png")
