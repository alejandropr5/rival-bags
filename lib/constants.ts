export const BRAND_CONSTANTS = {
  INSTAGRAM_URL: 'https://www.instagram.com/rivalbags_/',
  WHATSAPP_NUMBER: '+573150264979',
  get WHATSAPP_URL() {
    return `https://wa.me/${this.WHATSAPP_NUMBER.replace(/\+/g, '')}`;
  },
};
