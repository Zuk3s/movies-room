import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <div className="flex gap-3">
      <Link
        isExternal
        className={buttonStyles({
          color: "primary",
          radius: "full",
          variant: "shadow",
        })}
        href={siteConfig.links.github}
      >
        Documentation
      </Link>
      <Link
        isExternal
        className={buttonStyles({ variant: "bordered", radius: "full" })}
        href={siteConfig.links.github}
      >
        <GithubIcon size={20} />
        GitHub
      </Link>
    </div>
  );
}
