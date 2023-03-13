import styled from 'styled-components';

export const StCalendarWrapper = styled.div`
  position: absolute;
  z-index: 10;
  margin-top: 0.75rem;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
`;