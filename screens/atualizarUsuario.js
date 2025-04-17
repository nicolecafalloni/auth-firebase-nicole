const handleUpdateProfile = async () => {
    const credential = EmailAuthProvider.credential(user.email, senhaAtual);
  
    try {
      // Reautentica o usuário antes de fazer mudanças sensíveis
      await reauthenticateWithCredential(user, credential);
  
      // Atualiza o nome do usuário no banco de dados
      await updateDoc(userDocRef, { nome });
  
      // Atualiza o e-mail, se houver alteração
      if (novoEmail && novoEmail !== user.email) {
        await updateEmail(user, novoEmail);
      }
  
      // Atualiza a senha, se uma nova senha foi fornecida
      if (novaSenha) {
        await updatePassword(user, novaSenha);
      }
  
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.goBack();
  
    } catch (error) {
      console.error("Erro ao atualizar perfil: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar o perfil.");
    }
  };
  