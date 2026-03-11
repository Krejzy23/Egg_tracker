import { Text } from "react-native";
import GuideScreenLayout from "../components/guide/GuideScreenLayout";
import GuideSubsection from "../components/guide/GuideSubsection";
import GuideBulletIcon from "../components/guide/GuideBulletIcon";
import { useLanguage } from "../context/LanguageContext";

export default function EggGuideScreen() {
  const { t } = useLanguage();

  return (
    <GuideScreenLayout
      title={t("eggGuide.title")}
      subtitle={t("eggGuide.subtitle")}
      backLabel={t("common.backHome")}
    >
      <GuideSubsection title={t("eggGuide.sections.storage.title")}>
        <GuideBulletIcon
          icon="❄️"
          title={t("eggGuide.sections.storage.items.spaceTitle")}
          text={t("eggGuide.sections.storage.items.spaceText")}
        />
        <GuideBulletIcon
          icon="💧"
          title={t("eggGuide.sections.storage.items.runTitle")}
          text={t("eggGuide.sections.storage.items.runText")}
        />
        <GuideBulletIcon
          icon="🔝"
          title={t("eggGuide.sections.storage.items.entryTitle")}
          text={t("eggGuide.sections.storage.items.entryText")}
        />
      </GuideSubsection>

      <GuideSubsection title={t("eggGuide.sections.fresh.title")}>
        <GuideBulletIcon
          icon="🥚"
          title={t("eggGuide.sections.fresh.items.spaceTitle")}
          text={t("eggGuide.sections.fresh.items.spaceText")}
        />
        <GuideBulletIcon
          icon="⌛️"
          title={t("eggGuide.sections.fresh.items.runTitle")}
          text={t("eggGuide.sections.fresh.items.runText")}
        />
        <GuideBulletIcon
          icon="🚰"
          title={t("eggGuide.sections.fresh.items.entryTitle")}
          text={t("eggGuide.sections.fresh.items.entryText")}
        />
      </GuideSubsection>

      <GuideSubsection title={t("eggGuide.sections.eggTips.title")}>
        <GuideBulletIcon
          icon="💪"
          title={t("eggGuide.sections.eggTips.items.spaceTitle")}
          text={t("eggGuide.sections.eggTips.items.spaceText")}
        />
        <GuideBulletIcon
          icon="🍳"
          title={t("eggGuide.sections.eggTips.items.runTitle")}
          text={t("eggGuide.sections.eggTips.items.runText")}
        />
        <GuideBulletIcon
          icon="💡"
          title={t("eggGuide.sections.eggTips.items.entryTitle")}
          text={t("eggGuide.sections.eggTips.items.entryText")}
        />
      </GuideSubsection>
    </GuideScreenLayout>
  );
}