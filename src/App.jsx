import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const InfiniteScroll = ({ imgs }) => {
  const containerRef = useRef(null);
  const [items, setItems] = useState([...imgs, ...imgs]); // 双倍数据模拟无限循环
  const [scrollPos, setScrollPos] = useState(0);

  // 初始化滚动位置
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight / 2; // 初始化到中间
      console.log(container.scrollTop);

      setScrollPos(container.scrollHeight / 2);
    }
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const maxScroll = container.scrollHeight / 2;
    const currentScroll = container.scrollTop;

    // 当滚动接近起点或终点时，调整位置回到中间
    if (currentScroll <= 0) {
      container.scrollTop = maxScroll;
    } else if (currentScroll >= maxScroll * 2) {
      container.scrollTop = maxScroll;
    }

    setScrollPos(container.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-scroll no-scrollbar"
      onScroll={handleScroll}
    >
      <div className="flex items-center">
        {items.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            className="flex-none w-[200px] h-[300px] mx-2 bg-gray-100 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-3/4 object-cover rounded-t-lg"
            />
            <div className="p-2 text-center text-[5.5vmi] font-bold">
              {item.name}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const imgs = [
    { id: 1, name: "进击的巨人", src: "./avator/bg-5.jpg" },
    { id: 2, name: "风骚律师", src: "./avator/bg-6.jpg" },
    { id: 3, name: "葬送的芙莉莲", src: "./avator/bg-7.jpg" },
    { id: 4, name: "轻音少女", src: "./avator/bg-8.jpg" },
    { id: 1, name: "进击的巨人", src: "./avator/bg-5.jpg" },
    { id: 2, name: "风骚律师", src: "./avator/bg-6.jpg" },
    { id: 3, name: "葬送的芙莉莲", src: "./avator/bg-7.jpg" },
    { id: 4, name: "轻音少女", src: "./avator/bg-8.jpg" },
  ];

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <InfiniteScroll imgs={imgs} />
      </div>
      <div className="h-[1000px] bg-black">
        <p>1231</p>
      </div>
    </>
  );
}
