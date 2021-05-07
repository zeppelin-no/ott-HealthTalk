import React from 'react';
import type { Playlist, PlaylistItem } from 'types/playlist';
import classNames from 'classnames';

import Card from '../Card/Card';
import TileDock from '../TileDock/TileDock';
import useBreakpoint, { Breakpoint } from '../../hooks/useBreakpoint';

import styles from './Shelf.module.scss';

export const tileBreakpoints = {
  [Breakpoint.xs]: 1,
  [Breakpoint.sm]: 3,
  [Breakpoint.md]: 4,
  [Breakpoint.lg]: 5,
  [Breakpoint.xl]: 6,
};

export const featuredTileBreakpoints = {
  [Breakpoint.xs]: 1,
  [Breakpoint.sm]: 2,
  [Breakpoint.md]: 2,
  [Breakpoint.lg]: 2,
  [Breakpoint.xl]: 2,
};

export type ShelfProps = {
  playlist: Playlist | undefined;
  onCardClick: (playlistItem: PlaylistItem) => void;
  onCardHover: (playlistItem: PlaylistItem) => void;
  featured?: boolean;
  loading?: boolean;
};

const placeholderItems = new Array(15).fill({});

const Shelf: React.FC<ShelfProps> = ({ playlist, onCardClick, onCardHover, featured = false, loading = false }: ShelfProps) => {
  const breakpoint: Breakpoint = useBreakpoint();
  const tilesToShow: number = featured ? featuredTileBreakpoints[breakpoint] : tileBreakpoints[breakpoint];

  if (!playlist) return null;

  return (
    <div className={styles['Shelf']}>
      {!featured && (
        <h2 className={styles['title']}>{loading ? '...' : playlist.title}</h2>
      )}
      <TileDock<PlaylistItem | number>
        items={loading ? placeholderItems : playlist.playlist}
        tilesToShow={tilesToShow}
        cycleMode={'restart'}
        transitionTime={loading ? '0s' : '0.3s'}
        spacing={12}
        renderLeftControl={(handleClick) => (
          <button className={classNames(styles['arrowButton'], styles['arrowLeft'])} onClick={handleClick}>
            &lt;
          </button>
        )}
        renderRightControl={(handleClick) => (
          <button className={classNames(styles['arrowButton'], styles['arrowRight'])} onClick={handleClick}>
            &gt;
          </button>
        )}
        renderTile={(item) => {
          if (loading || typeof item === 'number') {
            return (
              <Card
                title={'...'}
                duration={0}
                featured={featured}
              />
            );
          }

          return (
            <Card
              title={item.title}
              duration={item.duration}
              posterSource={item.image}
              onClick={() => onCardClick(item)}
              onHover={() => onCardHover(item)}
              featured={featured}
            />
          );
        }}
      />
    </div>
  );
};

export default Shelf;
