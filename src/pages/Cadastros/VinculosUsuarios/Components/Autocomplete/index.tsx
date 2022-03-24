import React from 'react';
import { VariableSizeList, ListChildComponentProps } from 'react-window';

import { ListSubheader, Typography, useMediaQuery } from '@mui/material';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';

const LISTBOX_PADDING = 8;

export function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography
      component="li"
      {...dataSet[0]}
      style={{
        ...inlineStyle,
        display: 'flex',
        justifyContent: 'space-between',
      }}
      sx={{
        '&[aria-selected="true"].Mui-focused': {
          backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
        },
        '&[aria-selected="true"]:not(.Mui-focused)': {
          backgroundColor: 'transparent !important',
        },
      }}
    >
      {dataSet[1]}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

export const OuterElementType = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  }
);

export function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

export const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactChild[] = [];
  (children as React.ReactChild[]).forEach(
    (item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactChild) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 16) {
      return 16 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };


  return (
    <div ref={ref} style={{ width: '100%' }}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={8}
          itemCount={itemCount}
          style={{ height: '100%' }}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

export const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      margin: 0,
      padding: 0,
    },
  },
});
