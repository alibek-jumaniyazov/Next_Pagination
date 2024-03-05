export async function GET() {
    const data = {
        products: [
            {id: 1}
        ]
    }
   
    return Response.json({ data })
  }