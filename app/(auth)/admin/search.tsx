'use client'
import { useSearchParams,usePathname,useRouter} from "next/navigation"
import { useDebouncedCallback } from "use-debounce";
const Search = ({ placeholder }: { placeholder?: string }) => {
  const searchParams=useSearchParams();
  const pathname=usePathname();
  const {replace}=useRouter();
  const handleSearch=useDebouncedCallback((term)=>{
    // console.log(`Searching +${term}`)
    const params=new URLSearchParams(searchParams);
    if(term){
      params.set("query",term);
    }else{
      params.delete("query");
    }
    // console.log(pathname)
    replace(`${pathname}?${params.toString()}`);
  },300);

  return (
    <div className='relative rounded-md shadow-sm'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>      </div>
      <input
        // value={search}
        defaultValue={searchParams.get("query")?.toString()}
        // placeholder={placeholder}
        placeholder="Search for user"
        onChange={e => handleSearch(e.target.value)}
        className="bg-transparent border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
      />
    </div>
  )
}

export default Search