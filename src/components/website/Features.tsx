import {
  faHeadset,
  faShield,
  faTruckFast,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

interface Feature {
  icon: IconDefinition;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: faTruckFast,
    title: "free and fast delivery",
    description: "Lightning delivery, guaranteed quality",
  },
  {
    icon: faHeadset,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: faShield,
    title: "Free returns",
    description: "Free return within 30 days",
  },
];

export default function Features() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-10 items-center justify-evenly">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col gap-5 items-center hover:scale-110 transition-all duration-300"
        >
          <div className="bg-[#C1C1C1] p-3 rounded-full">
            <div className="p-2 bg-black rounded-full w-20 h-20 flex items-center justify-center">
              <FontAwesomeIcon
                icon={feature.icon}
                className="text-white"
                size="2x"
              />
            </div>
          </div>
          <h2 className="text-[20px] font-bold uppercase">
            {t(feature.title)}
          </h2>
          <p className="">{t(feature.description)}</p>
        </div>
      ))}
    </div>
  );
}
