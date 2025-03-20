import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Grid, List, Search } from "lucide-react";
import NewsBox, { NewsBoxSkeleton } from "@/components/NewsBox/NewsBox";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { path } from "@/constants/path";
import { articleApi } from "@/api/article.api";

export default function Blog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data2, setData2] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const fetchData = (url, setDataResponse) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataResponse(data);
        setLoading(false);
      });

  };

  useEffect(() => {
    articleApi.getArticlesGroupByTag().then((data) => {
      // setData(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    fetchData("https://67d54d82d2c7857431eff604.mockapi.io/newsbox", setData);
    fetchData("https://67d54d82d2c7857431eff604.mockapi.io/newsbox2", setData2);
  }, []);

  const [viewType, setViewType] = useState("grid");

  const handleViewChange = (type) => {
    setViewType(type);
  };

  const breadcrumbsData = [
    { path: path.homepage, label: "Trang chủ" },
    { path: path.blog, label: "Cẩm nang" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbsData} />
      <div className="container mx-auto rounded-lg pb-14">
        {/* Banner */}
        <div className="mb-6">
          <img
            src="/images/camnang.png"
            alt="Cẩm nang Mykingdom"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Phần tìm kiếm & danh mục bài viết */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar */}
          <div className="w-full space-y-4 md:w-1/3">
            {/* Ô tìm kiếm */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm (VD: lắp ráp, mô hình, ba lô...)"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <Search
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
            </div>

            {/* Danh mục bài viết */}
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-gray-700">
                DANH MỤC BÀI VIẾT
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="category-1">
                  <AccordionTrigger className="text-base font-medium">
                    Hướng dẫn lắp ráp
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Các bài viết hướng dẫn lắp ráp mô hình, LEGO, đồ chơi trí
                    tuệ.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="category-2">
                  <AccordionTrigger className="text-base font-medium">
                    Gợi ý quà tặng
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Gợi ý quà tặng phù hợp cho từng độ tuổi và sở thích của bé.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="category-3">
                  <AccordionTrigger className="text-base font-medium">
                    Bộ sưu tập mới
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Cập nhật các bộ sưu tập đồ chơi mới nhất tại Mykingdom.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Phần hiển thị bài viết */}
          <div className="w-full md:w-2/3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Tất cả bài viết
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleViewChange("grid")}
                  className="rounded-lg border p-2 hover:bg-gray-100"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => handleViewChange("list")}
                  className="rounded-lg border p-2 hover:bg-gray-100"
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            <div className={`grid gap-6 ${viewType === "grid" ? "grid-cols-2" : "grid-cols-1"}`}>
              {loading
                ? (
                  Array(4) // Hiển thị 4 Skeletons khi đang tải dữ liệu
                .fill(0)
                .map((_, index) => <NewsBoxSkeleton key={index} />)
                )
                : (
                  data.map((post) => (
                    <NewsBox
                      key={post.id}
                      image={post.image}
                      title={post.title}
                      description={post.description}
                      link={post.link}
                    />
                  ))
                )}
              </div>

            {/* Chuyển trang */}
            <div className="mt-6 flex justify-center">
              <button className="rounded-lg bg-red-500 px-4 py-2 text-white shadow-md transition hover:bg-red-600">
                Xem thêm bài viết
              </button>
            </div>
          </div>
        </div>

        {/* Phần "Có thể bạn sẽ thích" */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800">
            Có thể bạn sẽ thích
          </h3>
          <div className="mt-4 grid grid-cols-4 gap-6">
            {data2.map((post2) => (
              <NewsBox
                key={post2.id}
                image={post2.image}
                title={post2.title}
                description={post2.description}
                link={post2.link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
