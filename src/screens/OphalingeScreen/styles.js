import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../constants/colors';

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;

export const styles = StyleSheet.create({
  calloutTitleText: {
    fontWeight: 'bold',
    padding: 5,
  },
  calloutDescriptionText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  MainContainer: {
    ...StyleSheet.absoluteFillObject,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    position: 'absolute',
    bottom: 50,
  },
  text: {
    color: colors.shadowColor,
  },
  headerContainer: {
    height: '8%',
    width: '100%',
    backgroundColor: colors.primary,
  },
  headerSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRightText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
});
