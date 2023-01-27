import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ISetState } from "../types/helperTypes";
import qs from "query-string";

// Handle query params
export const useQueryParams = <S = any>(params: string, initialState: S) => {
     const navigate = useNavigate();
     const { search } = useLocation();
     const [queryState, setQueryState] = useState<S>(initialState);
     const [isMounted, setIsMounded] = useState(false);
     useEffect(() => {
          const queryObj: any = qs.parse(search);
          if (isMounted) {
               if (queryState) {
                    queryObj[params] = queryState;
               } else {
                    delete queryObj[params];
               }
               const stringified = qs.stringify(queryObj);
               navigate({ search: stringified });
          } else {
               if (queryObj[params]) {
                    setQueryState(queryObj[params]);
               }
               setIsMounded(true);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [search, queryState]);

     return [queryState, setQueryState] as [S, ISetState<S>];
};

// Listen click event outside
export const useOutsideClick = (initialIsVisible: boolean) => {
     const [isVisible, setIsVisible] = useState<boolean>(initialIsVisible);
     const ref = useRef<HTMLElement>(null);

     const handleClickOutside = (event: any) => {
          if (ref.current && !ref.current.contains(event.target)) {
               setIsVisible(false);
          }
     };

     useEffect(() => {
          document.addEventListener("click", handleClickOutside, true);
          return () => {
               document.removeEventListener("click", handleClickOutside, true);
          };
     }, []);

     return { ref, isVisible, setIsVisible };
};
