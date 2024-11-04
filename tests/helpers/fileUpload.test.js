import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dgze8y0m9',
  api_key: '636398567912275',
  api_secret: 'bCuR3cLKLiYTBnrJkNwwGRAqO40',
  secure: true,
});

describe('pruebas en fileUpload', () => {
  test('subir archivos correctamente', async () => {
    const imageUrl =
      'https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    console.log(url);

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.api.delete_resources([imageId]);
  });

  test('debe de retornar null', async () => {
    const file = new File([], 'foto.jpg');

    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
