import { Image } from "antd";
import TreeNode from "./AdminContent/DimensionFiles/FoldersTab/FolderTree";

function addToParent(folder, node) {
  for (let item of folder) {
    if (+item.id === +node.parentId) {
      if (!item.children) {
        item.children = [];
      }
      item.children.push(node);
      return true;
    }
    if (item.children && item.children.length > 0) {
      const added = addToParent(item.children, node);
      if (added) return true;
    }
  }
  return false;
}

export function addChildNode(data, node) {
  // Helper function to create a deep copy of the folder
  function deepCopy(array) {
    return array.map((item) => ({
      ...item,
      children: item.children ? deepCopy(item.children) : [],
    }));
  }

  const newFolder = deepCopy(data);
  if (!node.parentId) {
    // Add to the top level
    newFolder.push(node);
  } else {
    // Function to recursively search and add the node
    addToParent(newFolder, node);
  }

  return newFolder;
}

export function flattenFolder(data) {
  const folder = data;
  const flattened = [];

  function flattenRecursive(item) {
    flattened.push(item);
    if (item.children) {
      item.children.forEach(flattenRecursive);
    }
  }

  folder.forEach(flattenRecursive);
  return flattened;
}

export function renameNodeById(data, id, newName) {
  const folder = data;

  // Helper function to recursively search and rename
  function renameNode(node) {
    if (node.id === id) {
      node.name = newName;
      return true; // Node found and renamed
    }

    if (node.children) {
      for (let child of node.children) {
        if (renameNode(child)) {
          return true; // Stop once the node is found and renamed
        }
      }
    }

    return false; // Node not found in this branch
  }

  for (let node of folder) {
    if (renameNode(node)) {
      break; // Stop if the node was found and renamed
    }
  }

  return folder;
}

export function deleteNodeById(data, id) {
  const folder = data;

  // Helper function to recursively search and delete
  function deleteNode(nodes, id) {
    return nodes.filter((node) => {
      if (node.id === id) {
        return false; // Filter out this node to delete it
      }

      if (node.children) {
        node.children = deleteNode(node.children, id);
      }

      return true; // Keep the node
    });
  }

  return deleteNode(folder, id);
}

export function transferNode(data, nodeId, targetFolderId) {
  const folder = data;
  let nodeToTransfer = null;
  let sourceParent = null;
  let sourceIndex = -1;

  // Helper function to find the node by ID without removing it
  function findNodeById(node, parent) {
    if (node.id === nodeId) {
      nodeToTransfer = node;
      sourceParent = parent;
      return true;
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (findNodeById(node.children[i], node)) {
          return true;
        }
      }
    }
    return false;
  }

  // Helper function to remove the node after it has been found
  function removeNodeById(node, parent) {
    if (node.id === nodeId) {
      if (parent) {
        const index = parent.children.findIndex((child) => child.id === nodeId);
        parent.children.splice(index, 1);
      }
      return true;
    }
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        if (removeNodeById(node.children[i], node)) {
          return true;
        }
      }
    }
    return false;
  }

  // Helper function to find the target folder by ID
  function findFolderById(node, id) {
    if (node.id === id && node.type === "FOLDER") {
      return node;
    }
    if (node.children) {
      for (let child of node.children) {
        const found = findFolderById(child, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  // Traverse the data to find the node to transfer at the root level
  for (let i = 0; i < folder.length; i++) {
    if (folder[i].id === nodeId) {
      nodeToTransfer = folder[i];
      sourceIndex = i;
      break;
    } else if (findNodeById(folder[i], null)) {
      break;
    }
  }

  // If the node is found, remove it from its original location
  if (nodeToTransfer) {
    if (sourceIndex !== -1) {
      folder.splice(sourceIndex, 1); // Remove node from the root level if found there
    } else if (sourceParent) {
      removeNodeById(sourceParent, null); // Remove node from its original parent
    }

    if (targetFolderId === null) {
      // Transfer to root if targetFolderId is null
      folder.unshift(nodeToTransfer); // Add node to the root level at the top
    } else {
      const targetFolder = findFolderById({ children: folder }, targetFolderId);
      if (targetFolder) {
        if (!targetFolder.children) {
          targetFolder.children = [];
        }
        targetFolder.children.unshift(nodeToTransfer); // Add node at the top of the children array
      } else {
        // If the target folder is not found, revert the transfer
        if (sourceParent) {
          sourceParent.children.unshift(nodeToTransfer); // Add back to its original parent at the top of the array
        } else {
          folder.unshift(nodeToTransfer); // If it was a root node, add it back to the root level at the top
        }
        console.error("Target folder not found");
      }
    }
  } else {
    console.error("Node not found");
  }

  return folder;
}

export function createTree(folders, renameMediaFolder, deleteMediaFolder, updateMediaFolder) {
  // Create a map to keep track of folder nodes by their IDs
  const folderMap = new Map();

  // Convert folders into tree nodes
  folders.forEach((folder) => {
    const folderNode = {
      key: folder.id,
      title: (
        <TreeNode
          item={{ ...folder, isFolder: true }}
          renameMediaFolder={renameMediaFolder}
          deleteMediaFolder={deleteMediaFolder}
          updateMediaFolder={updateMediaFolder}
        />
      ),
      ...(folder.image
        ? { icon: <Image src={folder.image} preview={false} width={32} height={32} /> }
        : {}),
      children: [],
      isLeaf: false,
      isFolder: true,
    };

    console.log("Folder Node", folderNode); // Log the folder nodes
    folderMap.set(folder.id, folderNode);
  });

  // Build the final tree structure by linking child folders to parent folders
  const treeData = [];
  folders.forEach((folder) => {
    if (folder.parentId === null) {
      // If the folder has no parent, it's a root node
      treeData.push(folderMap.get(folder.id));
    } else if (folderMap.has(folder.parentId)) {
      // If the folder has a parent, add it to the parent's children
      folderMap.get(folder.parentId).children.push(folderMap.get(folder.id));
    }
  });

  // Ensure folders appear at the top of the children array for each folder
  folderMap.forEach((folderNode) => {
    folderNode.children.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1; // a is folder, b is not
      if (!a.isFolder && b.isFolder) return 1; // b is folder, a is not
      return 0; // keep order for same types
    });
  });

  return treeData;
}
