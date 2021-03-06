import React, { useContext, useEffect, useState } from 'react';

import { useIntersection } from 'common/hooks/useIntersection';
import { getPublicProfileUrl } from 'core/appUrls';
import { Link } from 'core/components/Router';
import { ProfileSearchContext } from 'profile/providers/SearchFilter';

import ProfileSmall from './ProfileSmall';
import style from './search.less';

export const Users = () => {
  const { profiles, nextPage } = useContext(ProfileSearchContext);
  const [entry, targetRef] = useIntersection();
  const [count, setCount] = useState(0); // TODO: Implement inside useIntersection somehow.

  useEffect(() => {
    if (entry && entry.isIntersecting && count !== 0) {
      nextPage();
    }
    // TODO: Figure out why this is needed, and implement it inside the hook.
    setCount((stateCount) => stateCount + 1);
  }, [entry]);

  return (
    <>
      {!profiles.length ? (
        <div className={style.marginTop}>
          <h3>Finner ingen brukere med disse filterene</h3>
        </div>
      ) : (
        <div className={style.smallProfileGrid}>
          {profiles.map((profile) => (
            <Link key={profile.id} {...getPublicProfileUrl(profile.id)}>
              <a>
                <ProfileSmall profile={profile} />
              </a>
            </Link>
          ))}
        </div>
      )}
      <div ref={targetRef} />
    </>
  );
};

export default Users;
