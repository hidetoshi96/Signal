import { Ref } from 'vue';
interface group {
  groupName: string;
  userIDs: string[];
}
export const useGroups = () => {
  const groups = useState<group[]>('groups', () => []);
  const selectedGroup = useState<group | null>('selectedGroup', () => null);

  const setGroups = (groups: Ref<group[]>) => {
    return (savedGroups: group[]) => {
      groups.value = savedGroups;
    };
  };
  const addGroup = (groups: Ref<group[]>) => {
    return () => {
      groups.value.unshift({
        groupName: `group${groups.value.length + 1}`,
        userIDs: [],
      });
    };
  };
  const deleteGroup = (groups: Ref<group[]>) => {
    return (groupIndex: number) => {
      groups.value.splice(groupIndex, 1);
    };
  };
  const selectGroup = (
    groups: Ref<group[]>,
    selectedGroup: Ref<group | null>
  ) => {
    return (selectedTabName: string) => {
      selectedGroup.value = groups.value.find(
        (group) => group.groupName === selectedTabName
      )!;
    };
  };
  const updateGroupName = (groups: Ref<group[]>) => {
    return (groupIndex: number, newGroupName: string) => {
      groups.value[groupIndex].groupName = newGroupName;
    };
  };
  const addUserID = (groups: Ref<group[]>) => {
    return (groupIndex: number, userID: string) => {
      groups.value[groupIndex].userIDs.push(userID);
    };
  };
  const deleteUserID = (groups: Ref<group[]>) => {
    return (groupIndex: number, userIndex: number) => {
      groups.value[groupIndex].userIDs.splice(userIndex, 1);
    };
  };

  return {
    groups: readonly(groups),
    selectedGroup: readonly(selectedGroup),
    setGroups: setGroups(groups),
    addGroup: addGroup(groups),
    deleteGroup: deleteGroup(groups),
    selectGroup: selectGroup(groups, selectedGroup),
    updateGroupName: updateGroupName(groups),
    addUserID: addUserID(groups),
    deleteUserID: deleteUserID(groups),
  };
};
