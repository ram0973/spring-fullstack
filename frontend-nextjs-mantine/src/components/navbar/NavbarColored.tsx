import {useState} from 'react';
import {Code, Group} from '@mantine/core';
import {
  IconCategory,
  IconEdit,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconNotes,
  IconSettings,
  IconTag,
} from '@tabler/icons-react';
import classes from './NavbarColored.module.css';
import {Link} from "react-router-dom";

const data = [
  {link: '/admin/users', label: 'Users', icon: IconFingerprint},
  {link: '/admin/roles/', label: 'Roles', icon: IconKey},
  {link: '/admin/posts', label: 'Posts', icon: IconEdit},
  {link: '/admin/posts-categories', label: 'Categories', icon: IconCategory},
  {link: '/admin/posts-tags', label: 'Tags', icon: IconTag},
  {link: '/admin/posts-comments', label: 'Comments', icon: IconNotes}
  /*{link: '/admin/settings', label: 'Settings', icon: IconSettings},*/
];

export const NavbarColored = () => {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        //event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5}/>
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700} className={classes.version}>Blog</Code>
          <Code fw={700} className={classes.version}>
            v1.0.0
          </Code>
        </Group>
        {links}
      </div>


      <div className={classes.footer}>
        <Link to={"/logout"}
              className={classes.link}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5}/>
          <span>Logout</span>
        </Link>
      </div>

    </nav>
  );
}
