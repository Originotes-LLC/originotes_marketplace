/*
Code snippet adapted from this implementation: 
https://github.com/aws-amplify/amplify-ui/blob/main/packages/react/src/primitives/Pagination/useRange.ts


TODO: Reach out to the authors or maintainers of the original implementation to discuss the following:
- Can I use this code snippet in my project after some modification?

*/

const generateConsecutiveIntegers = (start: number, end: number): number[] => {
  const count = end - start + 1;
  return Array.from({ length: count }, (_, index) => start + index);
};

const DOTS = "...";

export const paginationRange = (
  currentPageProp: number,
  totalPagesProp: number
): (string | number)[] => {
  const currentPage = Math.max(currentPageProp, 1);
  const totalPages = Math.max(currentPage, totalPagesProp);
  const firstPage = 1;
  const totalNumberOfItems = 7;

  /**
   * Case 1: If the total pages is less than 7 (which is the total number of pages to show before any DOTS cases), then return from 1 to totalPages (e.g. [1, 2, 3, 4]).
   */
  if (totalPages < totalNumberOfItems) {
    return generateConsecutiveIntegers(1, totalPages);
  }
  /**
   * Determine if  dots should be rendered on either left or right side, or both
   */
  const leftSiblingPage = Math.max(currentPage - 1, firstPage);
  const rightSiblingPage = Math.min(currentPage + 1, totalPages);

  const shouldRenderStartingDots = leftSiblingPage > 2;
  const shouldRenderEndDots = rightSiblingPage < totalPages - 1;

  /**
   * Case 2: Only render  dots on the left side (e.g. [1, '...', 6, 7, 8, 9, 10]).
   */
  if (shouldRenderStartingDots && !shouldRenderEndDots) {
    const rightItemCount = 5;
    const rightRange = generateConsecutiveIntegers(
      totalPages - rightItemCount + 1,
      totalPages
    );
    return [firstPage, DOTS, ...rightRange];
  }
  /**
   * Case 3: Only render  dots on the right side (e.g. [1, 2, 3, 4, 5, '...', 10]).
   */
  if (!shouldRenderStartingDots && shouldRenderEndDots) {
    const leftItemCount = 5;
    const leftRange = generateConsecutiveIntegers(firstPage, leftItemCount);
    return [...leftRange, DOTS, totalPages];
  }
  /**
   * Case 4: Render  on both side (e.g. [1, '...', 4, 5, 6, '...', 10]).
   */
  const middleRange = generateConsecutiveIntegers(
    leftSiblingPage,
    rightSiblingPage
  );
  return [firstPage, DOTS, ...middleRange, DOTS, totalPages];
};
