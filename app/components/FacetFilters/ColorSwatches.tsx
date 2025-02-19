import { getTailwindColorClass } from '~/app/components/FacetFilters/GetTailwindColorClass';
import DiscoLightningInner from '../svgs/DiscoLightningInner';
import { ColorSwatchesProps } from '~/app/providers/interfaces';


export function ColorSwatches({ colors }: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap items-center justify-items-center mt-4 ">
      {colors.map((color) => (
        <div key={color.id}>
        <div
          // dieses div absolut setzen, wenn ein weiterer layer wie DiscoLightningInner benutzt wird
          className={`
            rounded-full border-[2px] mx-[2px]
           border-discogray w-6 h-6 ${getTailwindColorClass(
            color.name,
          )}`}
          title={color.name}
        />
        {/* <DiscoLightningInner
          className="relative fill-discogray w-9 h-9 border-[2px] border-discogray border-collapse  -mr-[2px]"

           /> */}
      
    </div>
    )) }
    </div>
  );
}