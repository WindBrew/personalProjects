import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask

qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # high correction, needed if adding a logo
    box_size=10,
    border=4,
)
qr.add_data("https://personal-projects-u6zd.vercel.app/")
qr.make(fit=True)

img = qr.make_image(
    image_factory=StyledPilImage,
    module_drawer=RoundedModuleDrawer(),
    color_mask=RadialGradiantColorMask(
        back_color=(255, 255, 255),
        center_color=(124, 183, 255),   # matches your app's blue
        edge_color=(255, 109, 182),     # matches your app's pink
    ),
)
img.save("qr_styled.png")