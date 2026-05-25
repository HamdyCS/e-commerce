export function formatDate(date: string | null | undefined, lang: string) {
  if (!date) return "";

  try {
    switch (lang) {
      case "ar":
        return new Date(date).toLocaleDateString("ar-EG", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      case "en":
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      default:
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
    }
  } catch (e) {
    return date;
  }
}
