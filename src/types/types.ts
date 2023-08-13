interface Racer {
    id: string;
    bicycle: string;
    group: string;
    name: string[];
    startingTime?: null | number;
    finishingTime?: null | number;
  }
  
  interface RootState {
    racers: {
      loading: boolean;
      error: string;
      value: Racer[];
    };
  }
  
  
  export default RootState;