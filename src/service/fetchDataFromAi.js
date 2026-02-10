export const generateProductDetails = async (productName, productCategory) => {
  console.log(productName, productCategory);

  if (!productName?.trim() || !productCategory?.trim()) {
    return {
      title: "Generic Product",
      description:
        "This product is designed for everyday use with reliable quality and performance.",
      keywords: ["product", "ecommerce", "item", "general"],
    };
  }

  const safeName = productName.trim();
  const safeCategory = productCategory.trim();

  const fallback = {
    title: `${safeCategory} ${safeName}`,
    description: `This ${safeCategory.toLowerCase()} ${safeName.toLowerCase()} is designed for reliable performance and regular use.`,
    keywords: [
      `${safeCategory.toLowerCase()} ${safeName.toLowerCase()}`,
      safeCategory.toLowerCase(),
      "ecommerce product",
      "quality item",
    ],
  };

  const extractJSON = (text = "") =>
    text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tngtech/deepseek-r1t2-chimera:free",
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content: `
You are an ecommerce product copy generator.

STRICT RULES:
- Use the provided Category and Product Name EXACTLY
- Title MUST contain both Category and Product Name
- Description must mention Category
- Only return 4 keywords that are relevant to the product, including the Category and Product Name
- Keywords must NOT be empty
- NEVER return empty strings
- DO NOT use placeholders like "Unspecified" or "Generic"
- Return ONLY raw JSON
              `.trim(),
            },
            {
              role: "user",
              content: `Category: ${safeCategory}\nProduct Name: ${safeName}`,
            },
          ],
        }),
      },
    );

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content;

    if (!raw) return fallback;

    const parsed = JSON.parse(extractJSON(raw));

    const isInvalid =
      !parsed ||
      !parsed.title?.trim() ||
      !parsed.description?.trim() ||
      !Array.isArray(parsed.keywords) ||
      parsed.keywords.length === 0 ||
      !parsed.keywords.every((k) => typeof k === "string" && k.trim()) ||
      !parsed.title.toLowerCase().includes(safeCategory.toLowerCase()) ||
      !parsed.title.toLowerCase().includes(safeName.toLowerCase());

    const hasUnspecified =
      /unspecified|placeholder|generic/i.test(parsed.title) ||
      /unspecified|placeholder|generic/i.test(parsed.description);

    if (isInvalid || hasUnspecified) return fallback;

    return {
      title: parsed.title.trim(),
      description: parsed.description.trim(),
      keywords: parsed.keywords.map((k) => k.trim()),
    };
  } catch (error) {
    console.error("AI product generation failed:", error);
    return fallback;
  }
};
