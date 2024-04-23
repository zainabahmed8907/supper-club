"use server";

export async function getOffers(pageNo, pageSize) {
    try {
      const offers = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/offer?pageNo=${pageNo}&pageSize=${pageSize}`,
        {
          next: {
            revalidate: 10,
          },
        }
      );
  
      return offers.json();
    } catch (e) {
      return e;
    }
  }
  