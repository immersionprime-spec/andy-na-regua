export function buildWhatsAppLink(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiryMessage(productName: string): string {
  return `Olá! Quero saber mais sobre: ${productName}`;
}
