import { Button } from "../ui/button";
import { Settings2 } from "lucide-react";
import { Input } from "~/app/components/ui/input"
import { Label } from "~/app/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/app/components/ui/sheet"
import { FacetValueFilters } from "~/app/components/FacetFilters/FacetValueFilters";


export default function FacetFilterDrawer({
    results,
    filterIds,
    updateFilterIds
  }: {
    results: any[];
    filterIds: string[];
    updateFilterIds: (ids: string[]) => void;
  }) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Settings2 className="fixed pointer-events-auto cursor-pointer rounded-full bg-secondary top-[79px] right-4 w-[26px] h-[26px] p-1 isolate z-[100]" />
      </SheetTrigger>
      <SheetContent className=" w-[100%] sm:w-[50%] xl:w-[30%]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <FacetValueFilters
                 results={results}
                 filterIds={filterIds}
                 updateFilterIds={updateFilterIds}
               />
        <SheetFooter>
          <SheetClose asChild>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
