export default async function handler(request, response) {
  try {
    // Usamos a URL de produção do seu backend
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://api.backsia.online";
    
    // Fazemos uma requisição GET simples só para "acordar" o servidor
    const res = await fetch(backendUrl);
    
    response.status(200).json({
      status: "Wake-up ping enviado com sucesso!",
      backendUrl: backendUrl,
      backendStatus: res.status
    });
  } catch (error) {
    console.error("Erro no ping:", error);
    response.status(500).json({ status: "Falha ao enviar ping", error: error.message });
  }
}
