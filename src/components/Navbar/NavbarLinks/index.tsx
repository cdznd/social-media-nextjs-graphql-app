import LinkButton from '../../LinkButton';
import navbarItems from '../data';

export default function NavbarLinks() {
    const renderNavbarItems = navbarItems.map((item, index) => {
        return (
          <LinkButton 
            key={index}
            label={item.label}
            href={item.href}
          />
        )
      })
    return renderNavbarItems
}