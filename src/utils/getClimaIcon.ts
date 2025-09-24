export default function getClimaIcon(weatherCode: number): string {
  switch (weatherCode) {
    // Céu limpo
    case 0:
      return '/assets/icon-clima/icon-sunny.webp';

    // Predominantemente claro a parcialmente nublado
    case 1:
    case 2:
      return '/assets/icon-clima/icon-sunny.webp';

    // Nublado
    case 3:
      return '/assets/icon-clima/icon-overcast.webp';
      
    // Névoa
    case 45:
    case 48:
      return '/assets/icon-clima/icon-fog.webp';

    // Chuvisco
    case 51:
    case 53:
    case 55:
      return '/assets/icon-clima/icon-drizzle.webp';

    // Chuva com neve
    case 56:
    case 57:
      return '/assets/icon-clima/icon-snow.webp';

    // Chuva
    case 61:
    case 63:
    case 65:
      return '/assets/icon-clima/icon-rain.webp';
    
    // Chuva congelante
    case 66:
    case 67:
      return '/assets/icon-clima/icon-rain.webp';

    // Neve
    case 71:
    case 73:
    case 75:
      return '/assets/icon-clima/icon-snow.webp';

    // Granizo
    case 77:
      return '/assets/icon-clima/icon-snow.webp';

    // Pancadas de chuva
    case 80:
    case 81:
    case 82:
      return '/assets/icon-clima/icon-storm.webp';
      
    // Pancadas de neve
    case 85:
    case 86:
      return '/assets/icon-clima/icon-snow.webp';
      
    // Tempestades
    case 95:
      return '/assets/icon-clima/icon-storm.webp';

    // Tempestades com granizo
    case 96:
    case 99:
      return '/assets/icon-clima/icon-storm.webp';

    default:
      return '/assets/icon-clima/icon-sunny.webp';
  }
}