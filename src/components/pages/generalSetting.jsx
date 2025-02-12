import ColorSetting from "../dashboard/GeneralCompoents/ColorSetting";
import HeroSetting from "../dashboard/GeneralCompoents/HeroSetting";
import AboutSetting from "../dashboard/GeneralCompoents/AboutSection";
import PackageSection from "../dashboard/GeneralCompoents/PackageSetting";
import DownloadAppSetting from "../dashboard/GeneralCompoents/DownloadAppSetting";
import SocialMediaLinkSetting from "../dashboard/GeneralCompoents/SocialMedia";
import FooterSection from "../dashboard/GeneralCompoents/FooterSection";

const GeneralPage = () => {
  return (
    <>
  
          <ColorSetting />
          <HeroSetting />
          <AboutSetting />
          <PackageSection />
          <DownloadAppSetting />
          <FooterSection />
          <SocialMediaLinkSetting />
    </>
  );
};
export default GeneralPage;
