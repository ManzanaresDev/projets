import { fetchCourses } from "../../outils/fetchCourses.js";

export async function getNavbarLinks() {
  let formations = [];
  try {
    // const url = ROUTES.ROUTE_COURSE_FETCH;
    // const res = await fetch(url);
    const res = await fetchCourses();
    const data = await res.json();
    formations = Array.isArray(data.courses) ? data.courses : [];
  } catch (e) {
    formations = [];
  }

  return [
    { value: "Accueil", hasDropdown: false, path: "/" },
    { value: "Dashboard", hasDropdown: false, path: "/dashboard" },
    {
      value: "Outils Gratuits",
      hasDropdown: true,
      list: [
        { label: "Canva", path: "/canva" },
        { label: "Notion", path: "/notion" },
        { label: "ChatGPT", path: "/chatgpt" },
      ],
    },
    {
      value: "Formations",
      hasDropdown: true,
      path: "/Formation",
      list: formations.map((course) => ({
        label: course.title,
        path: `/Formation?id=${course._id}`,
      })),
    },
  ];
}
