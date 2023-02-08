import { Ref } from 'vue';

export const useUrgencyStat = () => {
  const stat = useState<number[]>('stat', () => {
    return [0, 0, 0];
  });
  const setStat = (stat: Ref<number[]>) => {
    return (users: object) => {
      const count: number[] = [0, 0, 0];
      Object.values(users).forEach((user) => {
        count[Number(user.urgency)]++;
      });
      stat.value = count;
    };
  };
  return {
    stat: readonly(stat),
    setStat: setStat(stat),
  };
};
