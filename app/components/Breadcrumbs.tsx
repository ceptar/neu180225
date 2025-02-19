import { HomeIcon } from '@heroicons/react/24/solid';
import { Link } from '@remix-run/react';
// import { useTranslation } from 'react-i18next';

export function Breadcrumbs({
  items,
}: {
  items: { name: string; slug: string; id: string }[];
}) {
  // const { t } = useTranslation();

  return (
    <div>
    <div className="mx-auto py-1 border-t border-discogray bg-cover" style={{ backgroundImage: `url(../bgsmBlackPrism.svg)`}}>

    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
        <li>
          <div>
            <Link to="/" className="ml-4 text-sm font-light text-white transition-all duration-300 ease-out hover:opacity-70">
              Home
            </Link>
          </div>
        </li>
        {items
          .filter((item) => item.name !== '__root_collection__')
          .map((item, index) => (
            <li key={item.name}>
              <div className="flex items-center">
                <svg
                width="20"
                height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 480 480"
                  aria-hidden="true"
                >

<path d="M260.117 183.195C255.256 183.195 252.093 178.08 254.264 173.73L322.159 38.7846C324.188 34.7531 321.257 29.998 316.744 29.998H316.584H189.922H189.02C183.122 29.998 178.06 34.1999 176.974 39.9976L140.152 272.847C139.398 276.872 142.487 280.593 146.583 280.593H228.401C232.651 280.593 235.773 284.583 234.751 288.709L191.165 438.661C190.003 442.656 193 446.648 197.161 446.648C199.273 446.648 201.242 445.581 202.394 443.811L365.688 193.015C368.213 188.654 365.066 183.195 360.026 183.195H260.117Z" 
fill="white"/>

                </svg>
                <Link
                  to={'/collections/' + item.slug}
                  className="ml-1 text-sm text-white font-fw200 transition-all duration-300 ease-out hover:opacity-70"
                >
                  {item.name}
                </Link>
              </div>
            </li>
          ))}
      </ol>
    </nav>
    </div>
    </div>
  );
}
