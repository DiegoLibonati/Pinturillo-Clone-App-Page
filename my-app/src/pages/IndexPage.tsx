import { useMediaMatch } from "../hooks/exports";
import { NavBar } from "../ui/components/exports";
import { DesktopView, MobileView } from "../views/exports";

export const IndexPage = () => {
  const { matchMediaQuery } = useMediaMatch();

  return (
    <>
      <NavBar></NavBar>

      {!matchMediaQuery && <MobileView></MobileView>}

      {matchMediaQuery && <DesktopView></DesktopView>}
    </>
  );
};
