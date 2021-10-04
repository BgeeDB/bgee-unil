import React from 'react';
import { useLocation } from 'react-router-dom';
import i18n from '../../../i18n';
import Bulma from '../../Bulma';
import config from '../../../config.json';
import copyToClipboard from '../../../helpers/copyToClipboard';
import Notifications from '../../Notifications';

// todo handle set timeout

const Footer = () => {
  const loc = useLocation();
  const permanentLink = React.useMemo(
    () => config.permanentVersionedDomain + loc.pathname,
    [loc]
  );
  const [notif, setNotif] = React.useState([]);
  const closeElement = React.useCallback(
    (id) => () => {
      setNotif((prev) => {
        const current = [...prev];
        if (Array.isArray(current)) {
          const pos = current.findIndex((o) => o.id === id);
          if (pos > -1) current.splice(pos, 1);
        }
        return current;
      });
    },
    []
  );

  return (
    <Bulma.Footer>
      <div className="is-flex is-justify-content-space-between">
        <div className="left-wrapper">
          <a
            href="https://www.sib.swiss/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t('global.footer.sib')}
          </a>
          <a
            className="image cc"
            rel="license noopener noreferrer"
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
          >
            <Bulma.Image
              className="no-responsive"
              src="https://bgee.org/img/cc-zero.png"
              alt="CC0"
              height={15}
              width={80}
            />
          </a>
        </div>
        <div className="right-wrapper">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <a
            onClick={() => {
              copyToClipboard(permanentLink);
              const tmp = [...notif];
              const uuid = Math.random().toString(10);
              tmp.push({
                id: uuid,
                children: (
                  <>
                    Copied link <u>{permanentLink}</u>
                  </>
                ),
                className: 'is-success',
              });
              setNotif(tmp);
              setTimeout(() => {
                closeElement(uuid)();
              }, 1000);
            }}
          >
            {i18n.t('global.footer.copy-link')}
          </a>
          <a
            href="https://www.sib.swiss/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t('global.footer.cite-us')}
          </a>
          <Notifications content={notif} closeElement={closeElement} />
          <a
            href="https://www.sib.swiss/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t('global.footer.contact-us')}
          </a>
        </div>
      </div>
    </Bulma.Footer>
  );
};

export default Footer;
