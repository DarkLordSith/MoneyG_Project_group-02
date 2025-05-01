import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Currency from "../../components/Currency/Currency";

function CurrencyTab() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!isMobile) {
      navigate("/dashboard");
    }
  }, [isMobile, navigate]);

  return isMobile ? <Currency /> : null;
}

export default CurrencyTab;
