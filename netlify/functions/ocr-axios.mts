import axios from "axios";

const API_KEY = process.env.GOOGLE_AI_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const PROMPT = `Jesteś asystentem w księgowości i Twoim zadaniem jest wydobywanie informacji z faktur.
Otrzymałeś fakturę od dostawcy i musisz wydobyć następujące informacje:
1. Numer faktury
2. Data faktury
3. Forma płatności (czy była opłacona gotówką czy z konta bankowego np. karta, przelew, płatność online)
4. NIP klienta
5. Tabela pozycji z nazwą produktu, ilością, ceną jednostkową i sumą częściową z uwzględnieniem rabatów
6. Całkowita kwota
7. Przypisz kategorię (materiały, wyżywienie, usługi, transport, wyposażenie) do każdej pozycji (jeśli materiał jest wartościowy i ma cenę jednostkową powyżej 400, to jest wyposażeniem, a wyposażenie poniżej 400zł traktuj jak materiał)
8. Upewnij się, że wartości numeryczne podasz jako liczby, a nie jako ciągi znaków`;

export default async (request: Request) => {
  //   const productSummary = new URL(request.url).searchParams.get(
  //     "productSummary"
  //   );

  //   if (!productSummary) {
  //     return new Response("", { status: 200 });
  //   }

  const requestBody = await request.text();
  const { mime_type, data } = JSON.parse(requestBody);
  console.log(mime_type);

  const requestData = {
    contents: [
      {
        role: "user",
        parts: [{ text: "Faktura:" }, { inline_data: { mime_type, data } }],
      },
    ],
    systemInstruction: {
      role: "user",
      parts: [{ text: PROMPT }],
    },
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          documentNumber: {
            type: "string",
          },
          date: {
            type: "string",
          },
          formOfPayment: {
            type: "string",
            enum: ["gotówka", "bank"],
          },
          customerNIP: {
            type: "string",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                quantity: {
                  type: "number",
                },
                name: {
                  type: "string",
                },
                itemTotalPrice: {
                  type: "number",
                },
                category: {
                  type: "string",
                  enum: [
                    "materiały",
                    "wyżywienie",
                    "usługi",
                    "transport",
                    "wyposażenie",
                  ],
                },
              },
            },
          },
          total: {
            type: "number",
          },
        },
      },
    },
  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", JSON.stringify(response.data));

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    return new Response(JSON.stringify(response.data), { headers });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? JSON.stringify(error.response.data) : error.message
    );
  }
};
