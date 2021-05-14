import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  useTable,
  usePagination,
  useFilters,
  useAsyncDebounce,
  useSortBy,
} from 'react-table';
import styled from 'styled-components/macro';
import { Table, TableContainer, Paper, Container } from '@material-ui/core';
import HeaderBar from './components/HeaderBar';
import EventTableHead from './components/EventTableHead';
import EventTableBody from './components/EventTableBody';
import EventTableFooter from './components/EventTableFooter';
import Error from './components/Error';
import {
  DefaultColumnFilter,
  SelectColumnFilter,
} from './components/EventTableFilters';

const StyledTableContainer = styled(TableContainer)`
  margin-bottom: 24px;
`;

const App = () => {
  const [apiData, setApiData] = useState({ events: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setInitialLoad] = useState(true);
  const [isError, setIsError] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [eventDescriptions, setEventDescriptions] = useState([]);
  const fetchIdRef = useRef(0);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Event',
        accessor: 'eventShortDescription',
        Filter: (props) => (
          <SelectColumnFilter
            {...props}
            eventDescriptions={eventDescriptions}
          />
        ),
        disableSortBy: true,
      },
      {
        Header: 'Time Created',
        id: 'timeCreated',
        accessor: (row) => new Date(row.TimeCreated).toLocaleString(),
        disableFilters: true,
      },
      {
        Header: 'Target Object',
        accessor: 'targetObject',
        disableSortBy: true,
      },
      {
        Header: 'Source Object',
        accessor: 'sourceObject',
        disableSortBy: true,
      },
    ],
    [eventDescriptions]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    canPreviousPage,
    canNextPage,
    gotoPage,
    setAllFilters,
    state: { pageIndex, pageSize, filters, sortBy },
  } = useTable(
    {
      columns,
      data: apiData.events,
      defaultColumn,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [{ id: 'timeCreated', desc: true }],
      },
      pageCount,
      disableSortRemove: true,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const fetchData = useCallback(async () => {
    // eslint-disable-next-line no-plusplus
    const fetchId = ++fetchIdRef.current;
    setIsError(null);
    setIsLoading(true);
    if (fetchId === fetchIdRef.current) {
      try {
        const response = await fetch(
          `${
            process.env.NODE_ENV === 'development'
              ? process.env.REACT_APP_API_URL_DEV
              : process.env.REACT_APP_API_URL_PROD
          }/events?pageIndex=${pageIndex}&pageSize=${pageSize}&sortBy=${JSON.stringify(
            sortBy
          )}&filters=${JSON.stringify(filters)}`
        );
        const result = await response.json();
        if (!response.ok) {
          throw result;
        }
        setApiData(result);
        setPageCount(Math.ceil(result.count / pageSize));
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);
    }
  }, [pageSize, pageIndex, filters, sortBy]);

  const fetchDataDebounced = useAsyncDebounce(fetchData, 200);

  useEffect(() => {
    fetchDataDebounced({ pageSize, pageIndex, filters });
  }, [fetchDataDebounced, pageIndex, pageSize, filters, sortBy]);

  useEffect(() => {
    (async () => {
      setIsError(null);
      try {
        const response = await fetch(
          `${
            process.env.NODE_ENV === 'development'
              ? process.env.REACT_APP_API_URL_DEV
              : process.env.REACT_APP_API_URL_PROD
          }/eventDescriptions`
        );
        const result = await response.json();
        if (!response.ok) {
          throw result;
        }
        setEventDescriptions(result);
      } catch (error) {
        setIsError(error);
      }
      setInitialLoad(false);
    })();
  }, []);

  const handleChangePage = (newPage) => {
    gotoPage(newPage);
  };

  return (
    <>
      <Container>
        <HeaderBar filters={filters} setAllFilters={setAllFilters} />
        {isError && <Error error={isError} />}
        <Paper elevation={5}>
          <StyledTableContainer>
            <Table {...getTableProps()}>
              <EventTableHead headerGroups={headerGroups} />
              <EventTableBody
                getTableBodyProps={getTableBodyProps}
                isLoading={isLoading}
                isInitialLoad={isInitialLoad}
                pageSize={pageSize}
                page={page}
                prepareRow={prepareRow}
              />
              <EventTableFooter
                pageSize={pageSize}
                pageIndex={pageIndex}
                handleChangePage={handleChangePage}
                setPageSize={setPageSize}
                pageCount={pageCount}
                canNextPage={canNextPage}
                canPreviousPage={canPreviousPage}
              />
            </Table>
          </StyledTableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default App;
