import {
  getDatabase,
  ref,
  runTransaction,
  get,
  child,
} from 'firebase/database';
import { Ref } from 'vue';

interface supporter {
  [suppoterID: string]: string;
}
interface position {
  lat: number;
  lng: number;
}
interface user {
  name: string;
  position: position | null;
  lastUpdateTime: string;
  urgency: string;
  message: string;
  supporters: supporter;
}
interface users {
  [id: string]: user;
}
export const useUsers = () => {
  const users = useState<users>('users', () => {
    return {};
  });
  const selectedUsers = useState<users>('selectedUsers', () => {
    return {};
  });

  const selectUsers = (users: Ref<users>, selectedUsers: Ref<users>) => {
    return (selectedGroupUserIDs: string[] | null) => {
      selectedUsers.value = {};
      if (selectedGroupUserIDs == null) {
        selectedUsers.value = users.value;
      } else {
        for (const [id, user] of Object.entries(users.value)) {
          if (selectedGroupUserIDs.includes(id)) {
            selectedUsers.value[id] = user;
          }
        }
      }
    };
  };
  const getUsers = (users: Ref<users>) => {
    return async () => {
      const db = getDatabase();
      await get(child(ref(db), 'users/')).then((snapshot) => {
        for (const [key, value] of Object.entries(snapshot.val())) {
          users.value[key] = {
            name: (value as user).name,
            position: (value as user).position,
            lastUpdateTime: (value as user).lastUpdateTime,
            urgency: (value as user).urgency,
            message: (value as user).message,
            supporters:
              (value as user).supporters == null
                ? {}
                : (value as user).supporters,
          };
        }
      });
    };
  };

  return {
    users: readonly(users),
    selectedUsers: readonly(selectedUsers),
    getUsers: getUsers(users),
    selectUsers: selectUsers(users, selectedUsers),
  };
};

export const updateSupporters = (
  supporterID: string,
  supporterName: string,
  sponseeID: string
) => {
  const db = getDatabase();
  runTransaction(ref(db, `users/${sponseeID}/supporters/`), (post) => {
    if (post) {
      if (post[supporterID]) {
        post[supporterID] = null;
      } else {
        post[supporterID] = supporterName;
      }
    } else {
      post = {};
      post[supporterID] = supporterName;
    }
    return post;
  });
};
