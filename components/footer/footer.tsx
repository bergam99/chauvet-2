import Link from "next/link";
import classes from "./footer.module.css";
import FB from "@/public/icon/socialMedia/facebook.png";
import IG from "@/public/icon/socialMedia/instagram.png";
import YT from "@/public/icon/socialMedia/youtube.png";
import TW from "@/public/icon/socialMedia/twitter.png";
import Image from "next/image";
const Footer = () => {
  // TODO: ajouter footer contents
  return (
    <div className={classes.footer}>
      <div className={classes.contentsWrapper}>
        <div className={classes.container1}>
          <div className={classes.logoContainer}>
            <Link href="/">
              <h1 className="LogoLight">Chauvet</h1>
            </Link>
          </div>

          <div className={classes.socialMediaContainer}>
            <button className={classes.socialMedia}>
              <Image src={FB} alt="Facebook" width={20} height={20} />
            </button>
            <button className={classes.socialMedia}>
              <Image src={IG} alt="Instagram" width={20} height={20} />
            </button>
            <button className={classes.socialMedia}>
              <Image src={YT} alt="Youtube" width={20} height={20} />
            </button>
            <button className={classes.socialMedia}>
              <Image src={TW} alt="Twitter" width={20} height={20} />
            </button>
          </div>

          <div className={classes.linkContainer}>
            <Link href="/" className={classes.txt}>
              Politique de confidentialité
            </Link>
            <Link href="/" className={classes.txt}>
              CGU et mentions légales
            </Link>
            <Link href="/" className={classes.txt}>
              Nous contacter
            </Link>
            <Link href="/" className={classes.txt}>
              Devenir auteur
            </Link>
          </div>
        </div>
        <div className={classes.copyrightContainer}>
          <p className={classes.copyright}>
            Toutes les photos de ce site Web sont protégées par le droit
            d&apos;auteur et sont la propriété de Chauvet et/ou du photographe.
            Ces photos ne peuvent être utilisées à des fins commerciales sans
            l&apos;accord express et écrit autorisation du titulaire du droit
            d&apos;auteur. Veuillez nous contacter à chauvet@teamchauvet.com
            pour demander l&apos;autorisation d&apos;utiliser l&apos;une des
            photos de ce site Web.
          </p>
          <p className={`${classes.copyright} ${classes.copyrightpadding}`}>
            © Chauvet 2024 Site réalisé par Team Chauvet
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
