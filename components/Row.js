export default Row = ({ children }) => {
  return (
    <View style={styles.container}>{children}</View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
})
