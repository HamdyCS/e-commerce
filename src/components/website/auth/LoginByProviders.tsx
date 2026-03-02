import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import config from "../../../config";

export default function LoginByProviders() {
  const { t } = useTranslation();

  function handleLogin(provider: string) {
    let path = "";
    if (provider === "google") {
      path = config.auth.googleLogin;
    } else if (provider === "github") {
      path = config.auth.githubLogin;
    }
    window.location.href = `${config.baseUrl}${path}?returnUrl=${config.auth.returnUrl}`;
  }

  return (
    <>
      <button
        className="w-full rounded-md bg-white hover:bg-gray-100 cursor-pointer transition p-2 flex items-center justify-center gap-2 border-2"
        onClick={() => handleLogin("google")}
      >
        <FontAwesomeIcon icon={faGoogle} />
        <p className="font-bold">{t("Continue with Google")}</p>
      </button>
      <button
        className="w-full rounded-md bg-white hover:bg-gray-100 cursor-pointer transition p-2 flex items-center justify-center gap-2 border-2"
        onClick={() => handleLogin("github")}
      >
        <FontAwesomeIcon icon={faGithub} />
        <p className="font-bold">{t("Continue with GitHub")}</p>
      </button>
    </>
  );
}
