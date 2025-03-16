import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Grid, List, Search } from "lucide-react";
import NewsBox from "@/components/NewsBox/NewsBox";

export default function Blog() {

  const [data, setData] = useState([]);

  const [data2, setData2] = useState([]);

  const fetchData = (url, setDataResponse) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataResponse(data);
      })
  }

  useEffect(() => {
    fetchData("https://67d54d82d2c7857431eff604.mockapi.io/newsbox", setData)
    fetchData("https://67d54d82d2c7857431eff604.mockapi.io/newsbox2", setData2)
  }, [])

  const [viewType, setViewType] = useState("grid");

  const handleViewChange = (type) => {
    setViewType(type);
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Banner */}
      <div className="mb-6">
        <img
          src="/images/camnang.png"
          alt="Cẩm nang Mykingdom"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* Phần tìm kiếm & danh mục bài viết */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/3 w-full space-y-4">
          {/* Ô tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm (VD: lắp ráp, mô hình, ba lô...)"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          {/* Danh mục bài viết */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              DANH MỤC BÀI VIẾT
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="category-1">
                <AccordionTrigger className="text-base font-medium">
                  Hướng dẫn lắp ráp
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Các bài viết hướng dẫn lắp ráp mô hình, LEGO, đồ chơi trí tuệ.
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
        <div className="md:w-2/3 w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Tất cả bài viết</h3>
            <div className="flex space-x-3">
              <button onClick={() => handleViewChange("grid")} className="p-2 border rounded-lg hover:bg-gray-100">
                <Grid size={20} />
              </button>
              <button onClick={() => handleViewChange("list")} className="p-2 border rounded-lg hover:bg-gray-100">
                <List size={20} />
              </button>
            </div>
          </div>

          <div className={`grid gap-6 ${viewType === "grid" ? "grid-cols-2" : "grid-cols-1"}`}>
            {data.map((post) => (
              <NewsBox
                key={post.id}
                image={post.image}
                title={post.title}
                description={post.description}
                link={post.link}
              />
            ))}
          </div>

          {/* Chuyển trang */}
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
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
        <div className="grid gap-6 mt-4 grid-cols-2">
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
  );
}
