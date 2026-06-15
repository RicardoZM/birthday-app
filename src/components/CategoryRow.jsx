import { ChevronRight, ChevronLeft} from 'lucide-react';
import { useRef } from 'react';
import MatchScore from './MatchScore';

const CategoryRow = ({ category, onOpenDetails }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({ left: scrollLeft + (scrollAmount * direction), behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10 relative group px-4 md:px-12" id={category.id}>
      <h2 className="text-lg md:text-2xl font-bold text-gray-200 mb-4 hover:text-white cursor-pointer transition-colors flex items-center gap-2">
        {category.title} <ChevronRight className="w-5 h-5 text-transparent group-hover:text-red-500 transition-colors" />
      </h2>
      
      <div className="relative">
        <button onClick={() => handleScroll(-1)} className="absolute left-0 top-0 bottom-0 w-12 bg-black/60 z-20 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-r hover:bg-black/80 hover:w-14">
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <div ref={rowRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 -my-4 px-1">
          {category.items.map(item => (
            <div 
              key={item.id}
              onClick={() => onOpenDetails(item)}
              className="relative flex-none w-[180px] md:w-[260px] aspect-video rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:z-30 hover:shadow-2xl hover:shadow-black/80 snap-center"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3 md:p-4">
                <h3 className="text-white font-bold text-xs md:text-sm truncate mb-1">{item.title}</h3>
                <div className="flex items-center gap-2 text-[10px] md:text-xs">
                  <MatchScore score={item.match} />
                  <span className="text-gray-400">{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => handleScroll(1)} className="absolute right-0 top-0 bottom-0 w-12 bg-black/60 z-20 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-l hover:bg-black/80 hover:w-14">
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;