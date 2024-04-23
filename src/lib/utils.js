export const fetchDynamicContent = async (pathname) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_KEY}/dynamic-content?pathname=${pathname}`,
      {
        next: {
          revalidate: 10,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};