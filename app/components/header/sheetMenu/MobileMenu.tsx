import React, { useState, useEffect } from 'react';
import { Sheet, SheetTrigger, SheetContent } from '~/app/components/ui/sheet';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '~/app/components/ui/accordion';
import { Menu as MenuIcon } from 'lucide-react';
import { Link } from '@remix-run/react';

type MobileMenuProps = {
  collections: Array<any>;
  headerOpacity: number;
  rootRouteOpacity: number;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  collections,
  headerOpacity,
  rootRouteOpacity,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = collections?.filter(
    (collection) => collection.parentId === '15',
  );
  console.log('menuCategories', categories)

  const subCollections = collections?.filter(
    (collection) => collection?.parentId === '12',
  );

  console.log('menuSubCollections', subCollections)


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('prevent-scroll');
    } else {
      document.body.classList.remove('prevent-scroll');
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="text-center flex-col items-center justify-center">
          <MenuIcon
            onClick={() => setIsOpen(!isOpen)}
          />
        </button>
      </SheetTrigger>
      <SheetContent className="p-[40px] pt-20 w-[100%] sm:w-[50%] xl:w-[30%]">
        <Accordion type="single" collapsible>
          <AccordionItem value="collections">
            <AccordionTrigger className="justify-center text-2xl font-light pt-3 pb-2 px-2">Collections&nbsp;&nbsp;</AccordionTrigger>
            <AccordionContent>
              <ul className="">
                {subCollections.map((collection: { id: React.Key | null | undefined; slug: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                  <Link
                    key={collection.id}
                    to={`/products/${collection.slug}`}
                  >
                    <li className="text-center text-lg py-2">
                      {collection.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="categories">
            <AccordionTrigger className="justify-center text-2xl font-light pt-3 pb-2 px-2">Categories&nbsp;&nbsp;</AccordionTrigger>
            <AccordionContent>
              <ul className="">
                {categories.map((category) => (
                  <Link key={category.id} to={`/products/${category.slug}`}>
                    <li className="text-center text-lg py-2">
                      {category.name}
                      </li>
                  </Link>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
