const defaultPalette = {
            // Red,     Pink,       Purple,  Deep Purple,  Cyan,     Teal,    Green,   , Orange, Deep , Brown, Grey, Blue Grey
    '900': ['#B71C1C', '#880E4F', '#4A148C', '#311B92', '#006064', '#004D40', '#1B5E20','#BF360C', '#3E2723', '#212121', '#263238'],
};
const materialColorGenerator = () => {
    return defaultPalette['900'][Math.floor(Math.random()*11)];
};

export default materialColorGenerator;