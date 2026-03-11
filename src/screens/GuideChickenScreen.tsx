import GuideScreenLayout from "../components/guide/GuideScreenLayout";
import GuideSubsection from "../components/guide/GuideSubsection";
import GuideBulletIcon from "../components/guide/GuideBulletIcon";
import { useLanguage } from "../context/LanguageContext";

export default function ChickenGuideScreen() {
  const { t } = useLanguage();

  return (
    <GuideScreenLayout
      title={t("chickenGuide.title")}
      subtitle={t("chickenGuide.subtitle")}
      backLabel={t("common.backHome")}
    >
      <GuideSubsection title={t("chickenGuide.sections.coop.title")}>
        <GuideBulletIcon
          icon="🛖"
          title={t("chickenGuide.sections.coop.items.spaceTitle")}
          text={t("chickenGuide.sections.coop.items.spaceText")}
        />
        <GuideBulletIcon
          icon="🌿"
          title={t("chickenGuide.sections.coop.items.runTitle")}
          text={t("chickenGuide.sections.coop.items.runText")}
        />
        <GuideBulletIcon
          icon="💨"
          title={t("chickenGuide.sections.coop.items.entryTitle")}
          text={t("chickenGuide.sections.coop.items.entryText")}
        />
      </GuideSubsection>

      <GuideSubsection title={t("chickenGuide.sections.laying.title")}>
        <GuideBulletIcon
          icon="🥚"
          title={t("chickenGuide.sections.laying.items.spaceTitle")}
          text={t("chickenGuide.sections.laying.items.spaceText")}
        />
        <GuideBulletIcon
          icon="🌾"
          title={t("chickenGuide.sections.laying.items.runTitle")}
          text={t("chickenGuide.sections.laying.items.runText")}
        />
        <GuideBulletIcon
          icon="🌡️"
          title={t("chickenGuide.sections.laying.items.entryTitle")}
          text={t("chickenGuide.sections.laying.items.entryText")}
        />
      </GuideSubsection>

      <GuideSubsection title={t("chickenGuide.sections.tips.title")}>
        <GuideBulletIcon
          icon="🐣"
          title={t("chickenGuide.sections.tips.items.spaceTitle")}
          text={t("chickenGuide.sections.tips.items.spaceText")}
        />
        <GuideBulletIcon
          icon="🧺"
          title={t("chickenGuide.sections.tips.items.runTitle")}
          text={t("chickenGuide.sections.tips.items.runText")}
        />
        <GuideBulletIcon
          icon="🐓"
          title={t("chickenGuide.sections.tips.items.entryTitle")}
          text={t("chickenGuide.sections.tips.items.entryText")}
        />
      </GuideSubsection>
    </GuideScreenLayout>
  );
}
