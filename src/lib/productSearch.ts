import type { Product } from "@/types/product";

/** Chuẩn hóa chuỗi để so khớp tìm kiếm (không phân biệt hoa thường, bỏ dấu). */
export function normalizeSearchText(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ");
}

/** Lọc catalog theo từ khóa (tên, danh mục, mã, tag, mô tả rút gọn). */
export function searchProducts(catalog: Product[], query: string): Product[] {
  const q = normalizeSearchText(query);
  if (!q) return [];

  return catalog.filter((p) => {
    const blob = normalizeSearchText(
      [p.name, p.category, p.id, p.tag, p.material, stripHtml(p.description)].filter(Boolean).join(" ")
    );
    return blob.includes(q);
  });
}
